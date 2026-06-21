#!/usr/bin/env python3
"""
This module provides a script to display statistics about Nginx logs
stored in MongoDB.
"""
from pymongo import MongoClient


def log_stats():
    """
    Connects to the MongoDB logs.nginx collection and prints statistics.
    """
    client = MongoClient('mongodb://127.0.0.1:27017')
    collection = client.logs.nginx

    # 1. Total number of documents
    total_logs = collection.count_documents({})
    print(f"{total_logs} logs")

    # 2. Methods statistics
    print("Methods:")
    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    for method in methods:
        count = collection.count_documents({"method": method})
        print(f"\tmethod {method}: {count}")

    # 3. Status check: method=GET and path=/status
    status_check = collection.count_documents(
        {"method": "GET", "path": "/status"}
    )
    print(f"{status_check} status check")


if __name__ == "__main__":
    log_stats()
