with open("script.js", "r") as f:
    lines = f.readlines()

out = []
skip = False
for i, line in enumerate(lines):
    # lines to remove
    if i >= 446 and i <= 958:
        continue
        
    # Replace VIP trigger
    if line.strip() == "if (leadModal && !sessionStorage.getItem('girlee_vip_seen')) {":
        out.append("    const forceVip = window.location.search.includes('testvip=1');\n")
        out.append("    if (leadModal && (!sessionStorage.getItem('girlee_vip_seen') || forceVip)) {\n")
        continue
        
    # Remove checkAuth()
    if line.strip() == "checkAuth();":
        continue
        
    out.append(line)

with open("script.js", "w") as f:
    f.writelines(out)
