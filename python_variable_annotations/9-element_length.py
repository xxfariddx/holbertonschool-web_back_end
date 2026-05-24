#!/usr/bin/env python3
"""
This module provides a type-annotated function to calculate the length
of elements within an iterable.
"""
from typing import Iterable, List, Tuple, Sequence


def element_length(lst: Iterable[Sequence]) -> List[Tuple[Sequence, int]]:
    """
    Takes an iterable of sequences and returns a list of tuples containing
    each element and its corresponding length.
    """
    return [(i, len(i)) for i in lst]
