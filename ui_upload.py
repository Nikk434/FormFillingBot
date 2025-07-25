import gradio as gr
import requests
import json
import os 


# Define the backend endpoints
BOT_ENDPOINT = "http://127.0.0.1:7071/api/webhook"
#BOT_ENDPOINT = "https://clinicapp.azurewebsites.net/api/webhook"   
#BOT_ENDPOINT  = "https://goveligibility.azurewebsites.net/api/webhook"
#BOT_ENDPOINT  ="https://mpfinance-app.azurewebsites.net/api/webhook"


WHATSAPP_MEDIA_UPLOAD_ENDPOINT = "https://graph.facebook.com/v15.0/501076069765431/media"  # Replace with actual WhatsApp Media API endpoint
WHATSAPP_TOKEN="Bearer EAAJiedZADokIBOzoo2MfxAPqQVegDUWisZBzbnrhRMOjfMZBKA1oR6YKtA617f0OXTNaVpELpk0LR5bdwHYpWo4hqM7jic1fCfUmOru0abWywDDYTjIc92KqiWOkdAlZBl9svmy5i6aK16b4CwA67v2K1yfl519K5ceG9EWwaOCZAhuMVVs5qiHqPifxloLWkugZDZD"
#WHATAPP_NUM = "917666819468"
WHATAPP_NUM = "917040017471"
#WHATAPP_NUM = "917219261767"


# Chat history
chat_history = []

def send_message(user_input, file=None):
    global chat_history

#   print("Started the Send message function ::: ")    
    if not user_input and not file:
        return chat_history + [["", "Please provide a message or upload a document."]]

    # Add user input to chat history
#    if user_input:
#        chat_history.append(["User", user_input])

    body = {
        "entry": [
            {
                "changes": [
                    {
                        "value": {
                            "messages": []
                        }
                    }
                ]
            }
        ]
    }

    # Handle text messages
    if user_input:
        body["entry"][0]["changes"][0]["value"]["messages"].append({
            "from": WHATAPP_NUM,
            "text": {"body": user_input},
            "type": "text",
            "id": 432332
        })


    # Handle file upload
    if file:
        print("File uplaod started")
        mimeType = "application/pdf"
        
        try:
            # Upload the file to the real WhatsApp Media API
            with open(file.name, "rb") as f:
                
                files = { 'file': ('file', f, mimeType)}
                          
                #files = {"file": f, 'type': mimeType}

                headers = {
                    "Authorization": WHATSAPP_TOKEN  # Replace with your WhatsApp API access token
                }

                    # Prepare the form data
                form_data = {
                    'messaging_product': 'whatsapp',
                }

                upload_response = requests.post(WHATSAPP_MEDIA_UPLOAD_ENDPOINT, data=form_data, headers=headers, files=files)
            
                print("Upload Respone:", upload_response.text, upload_response.json)


            if upload_response.status_code == 200:
                upload_data = upload_response.json()
                media_id = upload_data.get("id")

                file_name = os.path.basename(file.name)
                print("Media ID ", media_id)
                # Add the document message to the payload
                body["entry"][0]["changes"][0]["value"]["messages"].append({
                    "from": WHATAPP_NUM,
                    "messaging_product": "whatsapp",
                    "document": {
                        "filename": file_name,    
                        "id": media_id,
                        "caption": "File uploaded via WhatsApp Media API"
                    },
                    "type": "document"
                })

                # Add file upload acknowledgment to chat history
                chat_history.append([user_input, f"Uploaded file: {file.name}"])
            else:
                return chat_history + [[user_input, "Error uploading file to WhatsApp. Please try again."]]

        except Exception as e:

            return chat_history + [[user_input, f"Error: {str(e)}"]]

    # Send the request to the WhatsApp bot
    
    response = requests.post(BOT_ENDPOINT, headers={"Content-Type": "application/json"}, json=body)
    


    print("Bot response:", response)
    print("\nBOT RESPONSE::\n", response.json() )

    # Check the response status
    if response.status_code == 200:
        response_data = response.json()
        if response_data.get("status") == "success":
            print("\nSUCCESS::\n", response_data)        
            msg =       f"{response_data.get('message', 'Message sent successfully')}"
            chat_history.append([user_input, msg])
        else:
            print("\nSUCCESS::\n", "Error") 
            msg =       f"Error: {response_data.get('message', 'Error in processing')}"
            chat_history.append([user_input, msg])
    else:
        print("\nSUCCESS::\n", "HTTP Error")
        chat_history.append( [user_input, f"HTTP Error: {response.status_code} - {response.reason}"])


    return chat_history





# Create Gradio interface
def interface():
    with gr.Blocks() as demo:
        gr.Markdown("# WhatsApp Hook Testing Client")

        with gr.Row():
            chat_box = gr.Chatbot(label="Chat History")

        with gr.Row():
            user_input = gr.Textbox(label="Your Message", placeholder="Type your message here...")
            file_upload = gr.File(label="Upload Document")

        with gr.Row():
            send_button = gr.Button("Send")

        send_button.click( send_message, inputs=[user_input, file_upload], outputs=chat_box )

    return demo


# Run the Gradio app
demo = interface()
demo.launch()
