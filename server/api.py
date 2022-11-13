#open json file into dict
import json
from flask import Flask

app = Flask(__name__)

@app.route("/")
def slash():
    return "/"

information = None
with open("classes_with_location_fix_clean.json", "r") as f: information = json.load(f)

@app.route("/getemptyclasses/<time>/<day>/<building>")
def get_empty_classes(time, day, building):
    empty_classes = []
    for key, value in information[building].items():
        for cl in value:
            if day not in cl[2]:
                empty_classes.append(cl[0]) 
            elif not (cl[4] < time and cl[5] > time):
                empty_classes.append(cl[0])
    print(empty_classes)
    return empty_classes

get_empty_classes("13:00", "M", "YAW")


if __name__ == '__main__':
    app.run(port=5100, debug=True)
    print('online')