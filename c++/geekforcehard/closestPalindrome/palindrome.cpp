#include <iostream>
#include <string>
#include <sstream>
#include <cmath>

using namespace std;


long long palfinder (long long x, long long po, int le , int n){

	


	if (le%2 == 1){

		long long pl = po;
		long long pal = x - x%po;
		int nr; 

		for (int i = 1 ; i < le+1 ; i++){

			pl = pl / 10;
			po = po * 10;
			nr = floor(10 * (x%po)/po);
			pal = pal + nr*pl;
			
		}
		return pal;

	}else {

		long long pl = po*10 ;
		long long pal = x - x%po;
		int nr; 

		for (int i = 0 ; i < n ; i++){

			pl = pl * 10;
			po = po / 10;
			nr = floor(10 * (x%pl)/pl);
			pal = pal + nr*po;			
		}
		return pal;
	}



}

long long palcompare (long long pal , long long x, int le, long long po, int n) {

	if ( pal == x){

		return pal;

	}else{

		int middle = floor(10 * (x%po)/po);

		if ( pal < x){

			if ( middle == 9){

				long long comp = palfinder(pal + po,po,le,n);

				if(x- pal > comp - x){

					return comp;

				}else{

					return pal;

				}

			}else if (le%2 == 1){

				if ( x - pal > (po + po/10)/2 ){

					return palfinder(pal + po,po,le,n);

				}else {

					return pal;
				}
				
			}else{
				if ( x - pal > po/2 ){

					return palfinder(pal + po,po,le,n);

				}else {

					return pal;
				}
			}
		}else{

			if ( middle == 0){

				long long comp = palfinder((pal - po),po,le,n);

				if(pal - x < x - comp){

					return pal;

				}else{

					return comp;

				}

			}else if (le%2 == 1){

				if ( pal - x > (po + po/10)/2 ){

					return palfinder((pal - po),po,le,n);

				}
				else{
					return pal;
				}
			}else{
				if ( pal - x > po/2){

					return palfinder((pal - po),po,le,n);

				}else{

					return pal;
				}
			}
		}
	}
}




int main (){



    string line;
    long long d;

    while (std::getline(cin, line))
    {
        stringstream ss(line);
        if (ss >> d)
        {
            if (ss.eof())
            {   // Success
                break;
            }
        }
        cout << "Error!" << endl;
    }

	int le = floor(log10(d));
	int n;

	if (le%2==0){

		n = le/2;

	}else{

		n = (le + 1)/2;
	};

	long long po = (long long) (floor( pow(10, n ) + 0.5));
	long long pal;

	if ( d == pow(10 , le)){

		pal = d-1;

	}else{

		pal =palfinder(d,po,le,n);

		pal = palcompare(pal,d,le,po,n);
	}
	cout << pal <<endl;



    
return 0;
}