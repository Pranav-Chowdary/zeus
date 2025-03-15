import requests

# First API Call: Encrypt/Send PAN Details
url_encrypt = "https://api.authbridge.com/InstantSearch/encrypted_string"
headers = {
    "Content-Type": "application/json",
    "username": "test@xxxx"  # Replace with your API username
}
data_encrypt = {
    "transID": "1XXXX1",  # Unique transaction ID
    "docType": 2,         # Document type (PAN card)
    "docNumber": "ALMPD0213D"  # PAN card number to verify
}

response_encrypt = requests.post(url_encrypt, json=data_encrypt, headers=headers)
if response_encrypt.status_code == 200:
    encrypted_response = response_encrypt.json()
    print("Encrypted Response:", encrypted_response)

    # Second API Call: Decrypt Response
    url_decrypt = "https://api.authbridge.com/decrypt_encrypted_string"
    data_decrypt = {
        "responseData": encrypted_response["responseData"]  # Use encrypted response here
    }
    response_decrypt = requests.post(url_decrypt, json=data_decrypt, headers=headers)
    if response_decrypt.status_code == 200:
        decrypted_data = response_decrypt.json()
        print("Decrypted Response:", decrypted_data)
    else:
        print("Decryption Failed:", response_decrypt.text)
else:
    print("Encryption Failed:", response_encrypt.text)
