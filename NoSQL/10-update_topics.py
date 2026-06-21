#!/usr/bin/env python3
"""
This module provides a function to update the topics field
for all school documents matching a given name.
"""


def update_topics(mongo_collection, name, topics):
    """
    Changes all topics of a school document based on the name.

    Args:
        mongo_collection: The pymongo collection object.
        name (string): The school name to update.
        topics (list of strings): The list of topics to set.

    Returns:
        The number of documents modified.
    """
    result = mongo_collection.update_many(
        {"name": name},
        {"$set": {"topics": topics}}
    )
    return result.modified_count


if __name__ == "__main__":
    # Example usage:
    # collection = client.my_db.school
    # update_topics(collection, "Holberton school", ["Python", "MongoDB"])
    pass