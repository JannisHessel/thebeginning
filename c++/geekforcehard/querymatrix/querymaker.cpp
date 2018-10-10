#include <iostream>
#include <fstream>
#include <cstdlib>
#include <ctime>

using namespace std;
int main(){

	int n,q,a,b,c,d;

	cout << "enter size of the matrix";
	cin >> n;
	cout << "enter a number of querys";
	cin >> q;


	fstream query;
	query.open ( "query.txt" , ios::out);
	srand(time(NULL));
		query << n << " " << q << endl;
		for (int j=0 ; j < q; j++){
				a = (rand()%n);
				b = (rand()%n);
				c = (rand()%n);
				d = (rand()%n);
				if ( a > c){
					if (b > d){
						query << c << " " << d << " " << a << " " << b << endl;
					}else{
						query << c << " " << b << " " << a << " " << d << endl;
					}
				}else{
					if (b > d){
						query << a << " " << d << " " << c << " " << b << endl;
					}else{
						query << a << " " << b << " " << c << " " << d << endl;
					}
				}
		};
		return 0;

}