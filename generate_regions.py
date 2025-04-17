import os

template_path = 'templates/region-template.html'
regions = ['balochistan', 'sindh', 'kp', 'gb', 'punjab']

for region in regions:
    region_path = f'regions/{region}.html'
    os.system(f'cp "{template_path}" "{region_path}"')
