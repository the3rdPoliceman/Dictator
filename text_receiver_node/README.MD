# Dictator

Dictator is a Node.js application that allows you to send text from your phone to your Mac computer seamlessly. By hosting a web page on your Mac, you can access it from your phone over the same network and send any text, which will be inserted at the current cursor position on your Mac.

## Features

- **Cross-device Text Transfer:** Send text from your phone to your Mac without any additional apps.
- **Supports Special Characters and Emojis:** Handles Unicode characters, special symbols, and multi-line text.
- **User-friendly Interface:** Simple web page with large buttons and a text area for easy interaction.

## Prerequisites

- **Mac Computer:** Running macOS with Node.js installed.
- **Node.js:** Download and install from [nodejs.org](https://nodejs.org/).
- **phone:** Connected to the same Wi-Fi network as your Mac.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/the3rdPoliceman/dictator.git
   cd dictator
   ```

2. **Install Dependencies**

	This project does not have external dependencies, but you can run:

    ```bash
    npm install
    ```

	to initialize the node_modules directory in case of future additions.

3. **Start the Server** 

   ```bash
	node server.js
	```

	The server will start and listen on port 8000.

4.  **Access the Web Page from Your Phone**

	Open a web browser on your phone.
	Navigate to http://<Your_Mac_IP_Address>:8000 (e.g., http://192.168.1.101:8000).
	Send Text to Your Mac


