import hashlib
import json
from web3 import Web3

# Connect to blockchain node (Ethereum/Polygon)
w3 = Web3(Web3.HTTPProvider("https://your-node-url"))

def save_data_on_chain(data_dict, from_address, private_key):
    # Hash data
    data_str = json.dumps(data_dict, sort_keys=True)
    hashed = hashlib.sha256(data_str.encode()).hexdigest()

    # Build transaction
    tx = {
        'from': from_address,
        'to': from_address,  # or smart contract
        'value': 0,
        'gas': 2000000,
        'data': w3.toHex(text=hashed)
    }

    # Sign & send
    signed_tx = w3.eth.account.sign_transaction(tx, private_key)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)

    return w3.toHex(tx_hash)
