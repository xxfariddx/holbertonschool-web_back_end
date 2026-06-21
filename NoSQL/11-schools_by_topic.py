#!/usr/bin/env python3
"""
This module provides a function to update the topics field
for all school documents matching a given name.
"""


def schools_by_topic(mongo_collection, topic):
    """
    Changes all topics of a school document based on the name.

    Args:
        mongo_collection: The pymongo collection object.
        name (string): The school name to update.
        topics (list of strings): The list of topics to set.

    Returns:
        The number of documents modified.
    """
    result = mongo_collection.find({"topics": topic})
    return list(result)

if __name__ == "__main__":
    # Example usage:
    # collection = client.my_db.school
    # print(schools_by_topic(collection, "Python"))
    pass