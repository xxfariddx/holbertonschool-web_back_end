#!/usr/bin/env python3
"""Module for creating multiple concurrent tasks."""

import asyncio
from typing import List

# Import task_wait_random from the previous file
task_wait_random = __import__('3-tasks').task_wait_random


async def task_wait_n(n: int, max_delay: int) -> List[float]:
    """Spawn task_wait_random n times with the specified max_delay

    and return the list of delays in ascending order.
    """
    delays: List[float] = []
    tasks: List[asyncio.Task] = []

    # Create tasks using the task_wait_random helper function
    for _ in range(n):
        task = task_wait_random(max_delay)
        tasks.append(task)

    # Use as_completed to process tasks as they finish execution
    for finished_task in asyncio.as_completed(tasks):
        delay = await finished_task
        delays.append(delay)

    return delays
