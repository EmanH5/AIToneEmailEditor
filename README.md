# AI Tone Email Editor

This is an AI-based email editor that recommends better body text according to a selected tone.

## Getting Started

To run the Node server and React UI app locally, follow these steps:

### Prerequisites

- Node.js (version 18.18.2 or higher)
- npm (version 10.2.1 or higher)

### Installation

1. Clone the repository:

    ```shell
    git clone https://github.com/EmanH5/AIToneEmailEditor.git
    ```

2. Install dependencies for the Node server:

    root folder
    ```shell
    npm install
    ```

3. Install dependencies for the React UI app:

    ```shell
    cd ../email-editor-app
    npm install
    ```

### Running the Application

1. Start the Node server:

    ```shell
    root folder
    npm start
    ```

    The server will run on `http://localhost:3001`.

2. Start the React UI app:

    ```shell
    cd ../email-editor-app
    npm start
    ```

    The UI app will run on `http://localhost:3000`.

## Usage

1. Open your web browser and navigate to `http://localhost:3000`.
2. Select a tone from the available options.
3. Enter your email to, subject and body text.
4. Click the "Check & Recommend Tone" button to get a better body text suggestion based on the selected tone.


## License

This project is licensed under the [GNU GPL] License
