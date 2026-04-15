import urllib.request
import json

url = "https://gqvgrxrkkksgxuaivvpb.supabase.co/rest/v1/messages?select=*"
headers = {
    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxdmdyeHJra2tzZ3h1YWl2dnBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwNDE3MDAsImV4cCI6MjA5MTYxNzcwMH0.C9GzB7ygtEgASjXHRTYSygrhwsa79GD8-QfjYr6lxTw",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxdmdyeHJra2tzZ3h1YWl2dnBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwNDE3MDAsImV4cCI6MjA5MTYxNzcwMH0.C9GzB7ygtEgASjXHRTYSygrhwsa79GD8-QfjYr6lxTw"
}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        print("MESSAGES STATS:", response.status)
        data = json.loads(response.read().decode())
        print("ROWS:", len(data))
        if len(data) > 0:
            print(data[0])
except Exception as e:
    print("ERROR:", str(e))
    if hasattr(e, 'read'):
        print(e.read().decode())
