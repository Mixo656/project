import os
from dotenv import load_dotenv
import requests

load_dotenv()
key = os.getenv('INDIAN_API_KEY')
print('INDIAN_API_KEY present:', bool(key))
if not key:
    raise SystemExit('No key')
headers = {'Authorization': f'Bearer {key}', 'Accept':'application/json'}
try:
    r = requests.get('https://api.indianapi.in/v1/stocks/list', headers=headers, timeout=15)
    print('status', r.status_code)
    try:
        data = r.json()
        if isinstance(data, dict):
            n = len(data.get('data', []))
            print('items in data:', n)
        else:
            print('response not dict, type:', type(data))
    except Exception as e:
        print('json error', e)
except Exception as e:
    print('request error', e)
