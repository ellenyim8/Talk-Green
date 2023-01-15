from flask import Flask, redirect 
from flask import jsonify
from flask import after_this_request
import requests

app = Flask(__name__)

@app.route('/get_data', methods=['GET', 'POST'])  
def get_data():
    #api_key = 'AIzaSyAZaRXjd4pTTVA9rLZJ-iS4TrYD86N-3yY'
    #@after_this_request
    #def add_header(response):
    #    response.headers['Access-Control-Allow-Origin'] = '*'
    #    return response 

    responses = requests.get("https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyAZaRXjd4pTTVA9rLZJ-iS4TrYD86N-3yY") 
    return responses.text

#@app.route('/test', methods=['GET', 'POST'])   
#def test():
##    KEY = 'AIzaSyAZaRXjd4pTTVA9rLZJ-iS4TrYD86N-3yY'
#    response = requests.get('https://web.archive.org/web/20191008214744/https://code.google.com/apis/console', params = {"key": KEY})
#    return response.text

if __name__ == "__main__":
    app.run(debug=True)
