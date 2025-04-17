#!/bin/bash

# Function to start the server
start_server() {
    echo "Starting server..."
    python3 -m http.server 8000 &
    SERVER_PID=$!
    echo "Server started with PID: $SERVER_PID"
    echo $SERVER_PID > server.pid
}

# Function to stop the server
stop_server() {
    if [ -f "server.pid" ]; then
        SERVER_PID=$(cat server.pid)
        if ps -p $SERVER_PID > /dev/null; then
            echo "Stopping server..."
            kill $SERVER_PID
            rm server.pid
            echo "Server stopped"
        else
            echo "No running server found"
            rm server.pid
        fi
    else
        echo "No server PID file found"
    fi
}

# Function to check server status
check_status() {
    if [ -f "server.pid" ]; then
        SERVER_PID=$(cat server.pid)
        if ps -p $SERVER_PID > /dev/null; then
            echo "Server is running (PID: $SERVER_PID)"
        else
            echo "Server PID file exists but process is not running"
            rm server.pid
        fi
    else
        echo "Server is not running"
    fi
}

# Main script logic
case "$1" in
    start)
        stop_server
        start_server
        ;;
    stop)
        stop_server
        ;;
    restart)
        stop_server
        start_server
        ;;
    status)
        check_status
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status}"
        exit 1
        ;;
 esac

exit 0
