#!/usr/bin/env python3
"""Module for creating an asyncio.Task."""

import asyncio

# Import wait_random from the previous file
wait_random = __import__('0-basic_async_syntax').wait_random


def task_wait_random(max_delay: int = 10) -> asyncio.Task:
    """Take an integer max_delay and return an asyncio.Task.

    This is a regular synchronous function that schedules the
    wait_random coroutine.
    """
    return asyncio.create_task(wait_random(max_delay))
