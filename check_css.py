
with open('style.css', 'r') as f:
    balance = 0
    for i, line in enumerate(f, 1):
        opens = line.count('{')
        closes = line.count('}')
        balance += opens - closes
        if balance < 0:
            print(f"Mismatch at line {i}: balance {balance}")
            # Show context
            print(f"Line content: {line.strip()}")
            break
