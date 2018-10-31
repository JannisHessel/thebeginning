#include <iostream>
#include <fstream>
#include <limits>
#include <cstdlib>
#include <ctime>

using namespace std;

int main(){
	long long n,q;
	long long x;
	cin>> n >> q;
	char c;

	fstream query;
	query.open ( "query.txt" , ios::out);
	srand(time(NULL));
	query << n << " " << q << endl;

	for (int j = 0 ; j < n ; j++){
		c = rand()%26 + 97;
		query << c ;
	}
	for (int j=0 ; j < q; j++){
		
			x = rand()%(n*(n+1)/2) + 1;
			query << endl << x;
	};



return 0;
}