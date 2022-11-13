import requests
import collections
from tqdm import tqdm
collections.Callable = collections.abc.Callable




#parse request

from bs4 import BeautifulSoup

def fetch_classes():

    r = requests.get('https://www.bu.edu/phpbin/course-search/search.php?page=w0&pagesize=5&adv=1&nolog=&search_adv_all=&yearsem_adv=2022-FALL&credits=*&pathway=&hub_match=all&pagesize=15000')

    data = r.content
    soup = BeautifulSoup(data, 'html5lib')
    mydivs = soup.find_all("div", {"class": "coursearch-result-heading"})
    f = open("classes.txt", "w")
    for div in tqdm(mydivs):
        #print(div.find('h6').text)
        #open text file and write
        f.write(div.find('h6').text.replace(" ", ""))
        f.write("\n")
    f.close()

def fetch_classes_with_location():
    f = open("classes.txt", "r")
    classes = f.readlines()
    f.close()

    for c in tqdm(classes):
        cl = c.strip()
        r = requests.get('https://www.bu.edu/phpbin/course-search/section/?t={c}&semester=2022-FALL'.format(c=cl))
        soup = BeautifulSoup(r.content, 'html5lib')
        #all but first
        rows = soup.find_all("tr", {"class": "first-row"})[1:]
        for row in rows:
            classroom = (row.find_all('td')[4].text)
            time = (row.find_all('td')[5].text)
            f2 = open("classes_with_location.txt", "a+")
            f2.write(cl.replace(" ", "") + "," + classroom + "," + time)
            f2.write("\n")
            f2.close()

""" fetch_classes() """
""" fetch_classes_with_location() """


#open classes.txt file and read line by line into list
