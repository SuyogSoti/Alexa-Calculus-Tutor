def intToString(num):
    if num == 1:
        return 'one'
    elif num == 2:
        return 'two'
    elif num == 3:
        return 'three'
    elif num == 4:
        return 'four'
    elif num == 5:
        return 'five'
    elif num == 6:
        return 'six'
    elif num == 7:
        return 'seven'
    elif num == 8:
        return 'eight'
    elif num == 9:
        return 'nine'
    elif num == 10:
        return 'ten'
    return ''
def powerToString(num):
    if num == 2:
        return 'second'
    elif num == 3:
        return 'third'
    elif num == 4:
        return 'fourth'
    elif num == 5:
        return 'fifth'
    elif num == 6:
        return 'sixth'
    elif num == 7:
        return 'seventh'
    elif num == 8:
        return 'eighth'
    elif num == 9:
        return 'ninth'
    elif num == 10:
        return 'tenth'
    return ''
def utterenceType(num, power):
    if num == 1:
        return "x to the power of %s" % intToString(power)
    elif num == 2:
        return "x to the %s" % powerToString(power)
    elif num == 3:
        return "x to the %s power" % powerToString(power)
    return ''

if __name__ == "__main__":
    f = open('polynomial.txt', 'w+')
    for x in range(0, 2): #adding squared and cubed cases
        for y in range(1, 11):
            if x == 0:
                string = 'x squared plus x plus %s' % intToString(y)
                f.write(string + '\n')
            elif x == 1:
                string = 'x cubed plus x plus %s' % intToString(y)
                f.write(string + '\n')
    for i in range(1, 4): #types
        for x in range(2, 11): #power
            addString = utterenceType(i, x)
            for y in range(1,11): #constant
                tempString = addString + ' plus x plus %s' % intToString(y)
                f.write(tempString + '\n')
    f.close()
