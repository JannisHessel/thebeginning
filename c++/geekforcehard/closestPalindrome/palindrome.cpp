#include <iostream>
#include <string>
#include <sstream>
#include <cmath>

using namespace std;


long long palfinder (long long x, long long po, int le , int n){

	


	if (le%2 == 1){

		long long pl = po;//getting the middle point of the number
		long long pal = x - x%po;// making all the later places of the number 0 so i can use simple addition to make them into what i need
		int nr; // helper variable for calculating the decimal place

		for (int i = 0 ; i < n ; i++){

			pl = pl / 10;//moving along the decimal places
			po = po * 10;
			nr = floor(10 * (x%po)/po);//getting the decimal place on the larger side
			pal = pal + nr*pl;//replacing the appropriate later decimal place
			
		}
		return pal;

	}else {

		long long pl = po*10 ;//if the number has an odd number of places the middle number stays the same so both place numbers need to be 1 further apart
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

	}else{//the goal is to avoid calculating a 2nd palindrome numbe rif possible

		int middle = floor(10 * (x%po)/po);

		if ( pal < x){//for distance comparisons it is important wether the calculatet pal is smaller or bigger

			if ( middle == 9){//in this case the distance between 2 palindromes vaies a lot depending on the number so i just calculate a second one

				long long comp = palfinder(pal + po,po,le,n);

				if(x- pal > comp - x){

					return comp;

				}else{

					return pal;

				}

			}else if (le%2 == 1){

				if ( x - pal > (po + po/10)/2 ){// for even number of places 2 neighboring palindromes are 231132 and 232232 so the distance is 1100 with the 1 beeing the 2 middle numbers

					return palfinder(pal + po,po,le,n);

				}else {

					return pal;
				}
				
			}else{
				if ( x - pal > po/2 ){// for odd number of places 2 neighboring palindromes are 23132 and 23232 so the distance is 100 with the 1 beeing the middle numbers

					return palfinder(pal + po,po,le,n);

				}else {

					return pal;
				}
			}
		}else{

			if ( middle == 0){//almost the same for palindromes beeing smaller than the original number

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

    while (std::getline(cin, line))//getting  the input as string to make sure it can be convertet to a longlong properly
    {//its a loop so i can break when/if the string is emptied out into the long long
        stringstream ss(line);
        if (ss >> d)//streaming the string into the longlong ; so typed numbers become long long places
        {
            if (ss.eof())
            {//checking if the input could completely be convertet to a longlong
                break;
            }
        }
        cout << "Could not convert the Input into a long long." << endl << "Please enter a maximum 10 digit number" << endl;;
    }

	int le = floor(log10(d));//length of the number
	int n;

	if (le%2==0){//checking wether the length is even or odd

		n = le/2;//recalculating length to ~ half the length for use in the algorithm

	}else{

		n = (le + 1)/2;
	};

	long long po = (long long) (floor( pow(10, n ) + 0.5));//used for finding the center of the number
	long long pal;

	if ( d == pow(10 , le)){// if the number is 10000000 the closest palindromes are 9999999 and 10000001 

		pal = d-1;

	}else{

		pal =palfinder(d,po,le,n);

		pal = palcompare(pal,d,le,po,n);
	}
	cout << pal <<endl;



    
return 0;
}