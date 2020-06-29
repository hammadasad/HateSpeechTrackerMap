import sys
from hatesonar import Sonar

def main():
    tweet = sys.argv[1]
    sonar = Sonar()
    print(sonar.ping(tweet))

if __name__ == '__main__':
    main()
