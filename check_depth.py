
with open('style.css', 'r') as f:
    depth = 0
    for i, line in enumerate(f, 1):
        opens = line.count('{')
        closes = line.count('}')
        prev_depth = depth
        depth += opens - closes
        # If we are at depth 0 and see a closing bracket, or if we look at the transition areas
        if i > 700:
             print(f"{i}: Depth {depth} | {line.strip()}")
        if depth < 0:
            print(f"!!! NEGATIVE DEPTH at line {i} !!!")
            break
