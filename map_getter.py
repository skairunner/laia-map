import requests
import json
import math
import os

LA_LONGLAT = [-118.243683, 33.9735]
Z = 7
LEVELS = 2

class Coord:
    def __init__(self, z, x, y):
        self.z = z
        self.x = x
        self.y = y

def slippy_from_longlat(longlat, z):
    xmerc = longlat[0] * math.pi / 180
    ymerc = longlat[1] * math.pi / 180
    n = 2 ** z
    x = math.floor(n * (1 + xmerc / math.pi) / 2)
    y = math.floor(n * (1 - ymerc / math.pi) / 2)
    return Coord(0, x, y)

def get_tile_coords(z, x, y, levels):
    if levels == 0:
        return [Coord(z, x, y)]
    return \
        get_tile_coords(z + 1, 2 * x, 2 * y, levels - 1) + \
        get_tile_coords(z + 1, 2 * x + 1, 2 * y, levels - 1) + \
        get_tile_coords(z + 1, 2 * x, 2 * y + 1, levels - 1) + \
        get_tile_coords(z + 1, 2 * x + 1, 2 * y + 1, levels - 1)


START = slippy_from_longlat(LA_LONGLAT, Z)
COORDS = get_tile_coords(Z, START.x, START.y - 1, LEVELS) + \
    get_tile_coords(Z, START.x + 1, START.y - 1, LEVELS) + \
    get_tile_coords(Z, START.x, START.y, LEVELS) + \
    get_tile_coords(Z, START.x + 1, START.y, LEVELS)

# Take all coords and get map tiles, then save
output = {}
key = os.environ['NEXTZEN_KEY']
for coord in COORDS:
    print(f'Getting map at {coord.z}/{coord.x}/{coord.y}')
    topo = requests.get(f"https://tile.nextzen.org/tilezen/vector/v1/512/all/{coord.z}/{coord.x}/{coord.y}.topojson?api_key={key}").json()
    with open(f'512-{coord.z}-{coord.x}-{coord.y}.topojson', 'w') as f:
        json.dump(topo, f)
