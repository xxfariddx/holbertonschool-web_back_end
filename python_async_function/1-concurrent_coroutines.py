#!/usr/bin/env python3
"""Module for asynchronous random delay."""
import asyncio
from typing import List

wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> List[float]:
    """Spawn wait_random n times with the specified max_delay

    and return the list of delays in ascending order.
    """
    delays = []
    tasks = []
    for i in range(n):
        q = wait_random(max_delay)
        tasks.append(q)

    for i in asyncio.as_completed(tasks):
        delay = await i
        delays.append(delay)

    return delays
