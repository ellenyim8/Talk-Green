from flask import Flask, redirect 
from flask import jsonify
from flask import after_this_request
import requests

app = Flask(__name__)

@app.route('/test', methods=['POST'])   
def test():
    response = requests.get('https://api.ap.org/v2/elections/xplor?apiKey=AIzaSyAp1r_CbGpy4wb9-IC1si7MmnhhCFPZvOc')
    return response.text

if __name__ == "__main__":
    app.run(debug=True)
