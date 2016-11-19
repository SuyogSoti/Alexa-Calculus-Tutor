import wolframalpha as w
import json as j
import sys

API = "2KE3YV-L8L7EQ62RE"
client = w.Client(API)
string = ""
for i in range(1, len(sys.argv)):
    string += sys.argv[i]

string.replace("open", "(")
string.replace("close", ")")
res = client.query(string)

print(next(res.results).text.split(" = ")[1])
