# [emptyroom](https://emptyroom.vercel.app/)

Find Empty Classrooms! (and see classroom occupancy times)

## How it's built

Because BU doesn't provide classroom information and because there were no exposed API's to find class dates from student link, a little creativity was required. 

Using the [BU Course Search Tool](https://www.bu.edu/phpbin/course-search/), if you press the search icon it sends a request to BU's database and returns all classes that match your query. 

By submitting a query and inputting a page size of 100,000 (overkill I know) it's possible to get the course code of every single course offered at BU. 

The BU Course Search Tool also allows you to click on courses offered and see all the teacher, section, and most important TIME and LOCATION where the course is offered. 

All that's left to do is run 12,000 course requests from all the course codes we got, isolate every response into a classroom with specific date and time ranges, and sort through all of them. Fun. 

beautifulsoup was used to extract all the important information from each individual course request and isolate the classroom number and date and time ranges on which it was occupied. That information was stored in a NoSql local DB (fancy words for JSON) and then used in the React client. The information contained days in which rooms were and weren't occupied and time ranges for those days. Those ranges were manipulated and parsed to give human readable responses to searches. 

## What's next for emptyroom

A very big missing part of the project is the ability to search for a specific room (or just search for a building, the scroll bar is too long). However that would most likely require a lot of brainpower and It's 6am or it would require migrating to an actual sql database so actual queries could be made instead of dealing with JSON. 
