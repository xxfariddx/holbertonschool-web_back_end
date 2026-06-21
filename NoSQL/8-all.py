#!/usr/bin/env python3
"""
This module provides a function to list all documents in a given MongoDB collection.
"""


def list_all(mongo_collection):
    """
    Lists all documents in a given MongoDB collection.
    """
    return list(mongo_collection.find())


if __name__ == "__main__":
    pass