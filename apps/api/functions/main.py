
from firebase_functions import firestore_fn, https_fn, options
from firebase_admin import initialize_app, firestore
import google.cloud.firestore

import os
from livekit import api
from flask import Flask
from flask_cors import CORS
app = initialize_app()

fl_app = Flask(__name__)
fl_app.config['CORS_HEADERS'] = 'Content-Type'
CORS(fl_app)

@fl_app.route('/gettoken')
def gettoken():
  token = api.AccessToken(os.getenv('LIVEKIT_API_KEY'), os.getenv('LIVEKIT_API_SECRET')) \
    .with_identity("identity") \
    .with_name("my name") \
    .with_grants(api.VideoGrants(
        room_join=True,
        room="my-room",
    ))
  print("TOKEKEKEKEKEKKE", token)
  resp = {
    "token": token.to_jwt()
  }
  return resp

@https_fn.on_request(
  cors=options.CorsOptions(
      cors_origins=[
        r"firebase\.com$", 
        r"https://flutter\.com", 
        r"http://127.0.0.1:3001", 
        r"https://127.0.0.1:3000", 
        r"http://172.20.10.6:3001"
        r"https://172.20.10.6:3000"
      ],
      cors_methods=["get", "post"],
  )
)
def krowl_app(req: https_fn.Request) -> https_fn.Response:
  with fl_app.request_context(req.environ):
    return fl_app.full_dispatch_request()

# @https_fn.on_request()
# def addmessage(req: https_fn.Request) -> https_fn.Response:
#     """Take the text parameter passed to this HTTP endpoint and insert it into
#     a new document in the messages collection."""
    
#     # Grab the text parameter.
#     request_json = req.get_json(silent=True)
    
#     if not request_json or ("text" not in request_json) or ("text" in request_json and request_json['text'] is None):
#         return https_fn.Response("No text parameter provided", status=400)

#     firestore_client: google.cloud.firestore.Client = firestore.client()

#     # Push the new message into Cloud Firestore using the Firebase Admin SDK.
#     _, doc_ref = firestore_client.collection("messages").add({"original": request_json["text"]})

#     # Send back a message that we've successfully written the message
#     return https_fn.Response(f"Message with ID {doc_ref.id} added.")
