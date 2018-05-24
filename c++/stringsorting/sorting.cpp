#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int charnumber ( int& i , string str ) {//i call the position in the string by refernce so i can change it from inside because uft characters can have more bytes
	int number = int(str[i]);
	i++;
	if ( number > -1 && number < 91){//starting to  map chars to numbers from 0 so it sorts ->stringend ->spacebar ->numbers ->letters properly ; i dont care about commands or special signs
		return number;
	}
	else if (number > 96 && number < 123){//mapping small letters onto the numbers of large letters
		number -= 32;
		return number;
	}

	else if (number < -64){//finding when its a 2 byte utf 8
		number = int(str[i]);
		i++;//second advancement of the position because 2 byte utf 8
		if (number > -129 && number < -121){//A
			return 65;
		}
		else if (number == -121){//C
			return 67;
		}
		else if (number > -121 && number < -116){//E
			return 69;
		}
		else if (number > -117 && number < -112){//I
			return 73;
		}
		else if (number == -111){//N
			return 78;
		}
		else if (number > -111 && number < -103){//O
			return 79;
		}
		else if (number > -104 && number < -99){//U
			return 85;
		}
		else if (number == -99){//Y
			return 98;
		}
		else if (number == -97){//S
			return 83;
		}
		else if (number < -97 && number > -89){//a
			return 65;
		}
		else if ( number == -89){//c
			return 67;
		}
		else if ( number > -89 && number < -84){//e
			return 69;
		}
		else if ( number > -85 && number < -80){//i
			return 73;
		}
		else if ( number == -79){//n
			return 78;
		}
		else if ( number > -79 && number < -71){//o
			return 79;
		}
		else if ( number > -72 && number < -67){//u
			return 85;
		}
		else if ( number > -68 && number < -64){//y
			return 98;
		}
		else {return 1;};//making it terminate
	}
	else if (number < -32 && number > -65){// checking for utf 8 with 3 bytes - didnt find a list / didnt want to sort that out
		i +=2;
		return 1;
	}
	else if (number < -16 && number > -33){// with 4 bytes 
		i += 3;
		return 1;
	}
	else if (number < -8 && number > -17){//etc
		i += 4;
		return 1;
	}
	else if (number < -4 && number > -9){
		i += 5;
		return 1;
	}
	else {return 1;};//making it terminate
};


bool stringcompare (string base , string swap) {//returns true if swap is alphabetically ahead of base so they need to be swapped
	int i = 0 ; int j = 0 ;
	waseven:
	int b = charnumber(i , base);
	int s = charnumber(j , swap);
	if (s < b){return false;}// 4 lines of comparing characters
	else if ( s > b ){return true;}
	else if ( s == 0 && b == 0){return false;}//shows up if string were equivalent and endet at the same point
	else { goto waseven;};//makes the function check the next letter because they were the same
};



int main () {
	string g = "ü";
	
	cout << stringcompare("äüg","äüä") <<endl ;
	cout << int(g[1]) << endl;

return 0;
};