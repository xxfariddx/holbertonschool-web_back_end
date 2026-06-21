#!/usr/bin/env python3
"""
This module provides a function to insert a document into a
MongoDB collection based on keyword arguments.
"""


def insert_school(mongo_collection, **kwargs):
    """
    Inserts a new document in a collection based on kwargs.

    Args:
        mongo_collection: The pymongo collection object.
        **kwargs: Arbitrary keyword arguments representing the
                  document fields.

    Returns:
        The new _id of the inserted document.
    """
    result = mongo_collection.insert_one(kwargs)
    return result.inserted_id


if __name__ == "__main__":
    # Example usage:
    # collection = client.my_db.school
    # new_id = insert_school(collection, name="Holberton school", city="San Francisco")
    pass