

n = int(input())
leaves = int(input())
b = list(range(1, leaves + 1))
a = [int(x) for x in input().split()]


for i in a:
    j = i 
    while j <= leaves:
        if j in b:
            b.remove(j)
        j += i 
    
print(len(b))