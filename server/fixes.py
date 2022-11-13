#open classeswithlocations.txt file and read line by line into list
from tqdm import tqdm
def find_classes_with_location():
    f = open("classes_with_location.txt", "r")
    classes = f.readlines()
    f.close()

    f2 = open("classes_with_location_fix.txt", "a+")

    for c in tqdm(classes):
        cl = c.split(",")
        if cl[1] == " ":
            continue
        else: 
            f2.write(c)
    f2.close()

find_classes_with_location()