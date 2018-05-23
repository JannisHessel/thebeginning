#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int charnumber ( int& i , string str ) {
	int number = int(str[i]);
	if ( number > 64 && number < 91){
		i++;
		return number;
	}
	else if (number > 91){
		number -= 32;
		i++;
		return number;
	}
;
};


bool stringcompare () {
	int i = 0 ; int j = 0 ;
	string base ;
	string swap ;


};



int main () {
	string str = "äÄ" ;
	int a;int j = 0;
	for (int i = 0 ; i < 20 ; i++){
		
		a = charnumber( j , str );
		cout << a << char(a);
	}
	cout << endl ;

return 0;
};