#!/usr/bin/env python3
"""
This module provides a type-annotated function that returns a tuple
containing a string and the square of a number as a float.
"""
from typing import Tuple, Union


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """
    Takes a string k and a number v, and returns a tuple where the first elem
    is k and the second element is the square of v represented as a float.
    """
    return (k, float(v**2))
