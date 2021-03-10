import sys
from nsetools import Nse
from pprint import pprint # just for neatness of display

nse = Nse()
print (nse)

q = nse.get_quote(sys.argv[1]) # it's ok to use both upper or lower case for codes.
print(q)
sys.stdout.flush()

# q = nse.get_stock_codes()
# for x in q:
#     pprint(x)
#     if x != 'SYMBOL':
#         q = nse.get_quote(x)
#         pass
#         pprint(q)
#         f = open("demofile2.txt", "a")
#         pass
#         f.write(q)
#         pass
# f.close()
# sys.argv[1]
# q = nse.get_quote('IRFC') # it's ok to use both upper or lower case for codes.
# pprint(q)
# f = open("demofile2.txt", "w")
# f.write(str(q))