#!/usr/bin/env python3
"""Module containing an asynchronous generator."""

import asyncio
import random
from typing import Generator


async def async_generator() -> Generator[float, None, None]:
    """Loop 10 times, asynchronously wait 1 second per iteration,

    and yield a random number between 0 and 10.
    """
    for _ in range(10):
        # Asynchronously pause execution for 1 second
        await asyncio.sleep(1)

        # Yield a random floating-point number between 0 and 10
        yield random.uniform(0, 10)
