f = open('polynomial.txt', 'w+')
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
def writeNaturalLog(poly):
    variation1 = "l.n. of "
    variation2 = "natural log of "
    f.write(variation1 + poly + '\n')
    f.write(variation2 + poly + '\n')
def writeLog(poly):
    variation1 = "log of "
    f.write(variation1 + poly + '\n')

    #different bases
    for x in range (2, 10):
        variation2 = "log base %s of " % intToString(x)
        f.write(variation2 + poly + '\n')

def writeExponential(poly):
    variation1 = "e to the power of "
    variation2 = ""
    f.write(variation1 + poly + '\n')

def writeTrig(poly):
    variation1 = "sine of "
    variation2 = "cosine of "
    variation3 = "tangent of "
    variation4 = "cosecant of "
    variation5 = "secant of "
    variation6 = "cotangent of "
    f.write(variation1 + poly + '\n')
    f.write(variation2 + poly + '\n')
    f.write(variation3 + poly + '\n')
    f.write(variation4 + poly + '\n')
    f.write(variation5 + poly + '\n')
    f.write(variation6 + poly + '\n')

def writeInverseTrig(poly):
    variation1 = "inverse sine of "
    variation2 = "arc sine of "
    variation3 = "inverse cosine of "
    variation4 = "arc cosine of "
    variation5 = "inverse tangent of "
    variation6 = "arc tangent of "
    f.write(variation1 + poly + '\n')
    f.write(variation2 + poly + '\n')
    f.write(variation3 + poly + '\n')
    f.write(variation4 + poly + '\n')
    f.write(variation5 + poly + '\n')
    f.write(variation6 + poly + '\n')

def rationalizePolyonmials(polyList):
    index = 0
    rPoly = []
    while index != len(polyList):
        for x in range(len(polyList)):
            if x != index:
                tStr = polyList[index] + ' over ' + polyList[x]
                rPoly.append(tStr)
        index+=1
    return rPoly


if __name__ == "__main__":
    #f = open('polynomial.txt', 'w+')
    polynomials = []
    for x in range(0, 2): #adding squared and cubed cases
        for y in range(1, 11):
            if x == 0:
                polynomials.append('open x squared plus x plus %s close' % intToString(y))
                polynomials.append('open square root of x %s close' % intToString(y))
                #f.write(string + '\n')
            elif x == 1:
                polynomials.append('open x cubed plus x plus %s close' % intToString(y))
                polynomials.append('open cubed root of x %s close' % intToString(y))
                #f.write(string + '\n')
    for i in range(1, 4): #types
        for x in range(2, 11): #power
            addString = 'open ' + utterenceType(i, x)
            for y in range(1,11): #constant
                polynomials.append(addString + ' plus x plus %s close' % intToString(y))
                polynomial = addString + ' plus x plus %s close' % intToString(y)
                polynomials.append('open x to the power of open ' + str(x) + ' divided by ' + str(y) + ' close close')
                polynomials.append('open x to the power of open ' + str(x) + ' over ' + str(y) + ' close close')
                #writeNaturalLog(polynomial)
                #writeLog(polynomial)
                #writeExponential(polynomial)
                #f.write(polynomial + '\n')

    #created all the polynomials we want
    polynomials += rationalizePolyonmials(polynomials)
    for x in range(len(polynomials)):
        f.write(polynomials[x] + '\n')
        writeNaturalLog(polynomials[x])
        writeLog(polynomials[x])
        writeExponential(polynomials[x])
        writeTrig(polynomials[x])
        writeInverseTrig(polynomials[x])
        f.write('pi plus x' + '\n')
        f.write('pi times x' + '\n')
        f.write('pi over x' + '\n')
        f.write('pi divided by x' + '\n')
        f.write('pi minus x')
        f.write('x plus pi' + '\n')
        f.write('x times pi' + '\n')
        f.write('x over pi' + '\n')
        f.write('x divided by pi' + '\n')
        f.write('x minus pi')
    for i in range(1, 11):
        varPlusConstant = 'x plus ' + intToString(i)
        varMinusConstant = 'x minus ' + intToString(i)
        varDivideConstant = 'x divided by ' + intToString(i)
        varDivideConstant2 = 'x over ' + intToString(i)
        varMultiplyConstant = 'x times ' + intToString(i)
        varMultiplyConstant2 = 'x multiplied by ' + intToString(i)
        f.write(varPlusConstant + '\n')
        f.write(varMinusConstant + '\n')
        f.write(varDivideConstant + '\n')
        f.write(varDivideConstant2 + '\n')
        f.write(varMultiplyConstant + '\n')
        f.write(varMultiplyConstant2 + '\n')
    f.close()
