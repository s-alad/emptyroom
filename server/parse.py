from datetime import datetime
import json 

#open classes_with_location_fix_clean.csv and read line by line first three letters into a set
s= set()
with open("classes_with_location_clean.csv", "r") as f:
    for line in f:
        school = line.split(",")[0].split(' ')[0]
        s.add(school)

    
print(sorted(s))

d = dict()

for school in s:
    d[school] = {}
#print(d)

def convert_to_army(d):
    in_time = datetime.strptime(d, "%I:%M %p")
    out_time = datetime.strftime(in_time, "%H:%M")
    return out_time

#read classes_with_location_fix_clean.csv and read line by line first three letters into corresponding dictionary
with open("classes_with_location_clean.csv", "r") as f:
    for line in f:
        cl = line.split(",")[0]
        school_code = line.split(",")[0].split(' ')[0]

        classroom = line.split(",")[0]
        course = line.split(",")[1]
        daystime = line.split(",")[2].strip()
        days = daystime.split(" ", 1)[0]
        time = daystime.split(" ", 1)[1]

        start_time = time.split("-")[0]
        end_time = time.split("-")[1]
        start = convert_to_army(time.split("-")[0])
        end = convert_to_army(time.split("-")[1])

        dt = {'start':start,'end':end}
        obj = {
            'classroom': classroom,
            'course': course,
            'days': days,
            'time': daystime,
            'start_army': start,
            'end_army': end,
            'start_regular': start_time,
            'end_regular': end_time
        }


        output = (classroom, course, days, daystime, start, end, dt)



        if cl not in d[school_code]:
            d[school_code][cl] = [obj]
        else:
            d[school_code][cl].append(obj)


#print(d)


json_object = json.dumps(d, indent = 4) 
#print(json_object)

#write this json fike to a file
with open("classes_with_location_clean.json", "w") as f:
    f.write(json_object)