#!/usr/bin/env python3
"""Module for asynchronous comprehensions."""

from typing import List

# Change the import from '5-async_generator' to '0-async_generator'
async_generator = __import__('0-async_generator').async_generator


async def async_comprehension() -> List[float]:
    """Collect 10 random numbers using an async comprehension

    over async_generator, then return the 10 random numbers.
    """
    return [number async for number in async_generator()]
