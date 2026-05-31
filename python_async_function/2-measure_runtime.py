#!/usr/bin/env python3
"""Module for measuring the runtime of execution."""

import asyncio
import time

# Import wait_n from the previous file
wait_n = __import__('1-concurrent_coroutines').wait_n


def measure_time(n: int, max_delay: int) -> float:
    """Measure the average execution time for wait_n(n, max_delay)

    per individual task and return total_time / n.
    """
    # Record the starting time
    start_time = time.perf_counter()

    # Execute the async function using the event loop
    asyncio.run(wait_n(n, max_delay))

    # Record the ending time
    end_time = time.perf_counter()

    # Calculate total elapsed time
    total_time = end_time - start_time

    return total_time / n
