from bs4 import BeautifulSoup
import urllib.request, urllib.parse
# recupere la page
html = urllib.request.urlopen("http://www.commitstrip.com/fr/")
# print (HTML)
#print(html)
# conversion du html avec la lib BeautifulSoup
soup = BeautifulSoup(html, features = "lxml")
#print(soup)
base = "div.excerpt section a"
link = soup.select_one(base)
url = link.get("href")
print(url)
html = urllib.request.urlopen(url)
finalsoup = BeautifulSoup(html, features = "lxml")
selectorTime = 'div.entry-meta a time'
selectorImg = 'div.entry-content p img'
date = finalsoup.select_one(selectorTime)
print(date.get_text())
image = finalsoup.select_one(selectorImg)
print(image.get('src'))