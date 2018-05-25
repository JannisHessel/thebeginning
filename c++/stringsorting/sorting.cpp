#include <iostream>
#include <fstream>
#include <string>
using namespace std;

string namelist = "peter+paul+mary+max+larry+";
const int nmc = 5 ;
size_t poslen [2][nmc] ;// poslen [0][x] will be position and poslen[1][x]the length of a name in the string; this array will be sortet instead of the strings
size_t memo [nmc] ;




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

	else if (number = -61){//finding when its a 2 byte utf 8
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
	else if (number < -32 && number > -60){// didnt sort out those chars (yet?)
		i +=1;
		return 1;
	}
	else if (number < -16 && number > -33){// for utf 8 with 3 bytes
		i += 2;
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

void sorting (){
	int k = 0;
	size_t temp ;
	for (int i = 0 ; i< nmc -1 ;i++){
		if (k == 0){
			for(int j= i+1 ; j < nmc ; j++ ){
				bool swp = stringcompare ( namelist.substr(poslen[0][i],poslen[1][i]) , namelist.substr(poslen[0][j],poslen[1][j]) );
				if(swp){
					memo[k]=j;
					k++;
					temp = poslen[0][i];
					poslen[0][i] = poslen[0][j];
					poslen[0][j] = temp;
					temp = poslen[1][i];
					poslen[1][i] = poslen[1][j];
					poslen[1][j] = temp;
				};
			};
		}
		else {
			k--;
			temp = poslen[0][i];
			poslen[0][i] = poslen[0][memo[k]];
			poslen[0][memo[k]] = temp;
			temp = poslen[1][i];
			poslen[1][i] = poslen[1][memo[k-1]];
			poslen[1][memo[k]] = temp;
			for (int j=memo[k]+1;j < nmc ; j++){
				bool swp = stringcompare ( namelist.substr(poslen[0][i],poslen[1][i]) , namelist.substr(poslen[0][j],poslen[1][j]) );
				if(swp){
					memo[k]=j;
					k++;
					temp = poslen[0][i];
					poslen[0][i] = poslen[0][j];
					poslen[0][j] = temp;
					temp = poslen[1][i];
					poslen[1][i] = poslen[1][j];
					poslen[1][j] = temp;
				};
			};
		};
	};
};

int main () {
poslen [0][0] = 0;
for (int i=1;i<nmc;i++){
	poslen [0][i] = namelist.find("+",poslen [0][i-1]) + 1;
	poslen [1][i-1] = poslen [0][i] - poslen [0][i-1] -1;
};
   poslen [1][nmc-1] = namelist.find("+",poslen[0][nmc-1]) - poslen[0][nmc-1];




for (int i=0;i<nmc;i++){
	string temp = namelist.substr(poslen[0][i],poslen[1][i]);
	cout << temp << poslen[0][i] << poslen [1][i] << endl;
};
return 0;
};