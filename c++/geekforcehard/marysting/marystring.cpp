#include <iostream>
#include <string>
#include <algorithm>
#include <fstream>

using namespace std;

char str[100001];
long long querys[100000];
char * pos1[100000];//storage for the stings that nat not the current substrings
char * pos2[100000];//storage for all the current substings
char ** adress[100000];//points in pos1 where the stings differ


long long * sorter(long long cq[2] , long length , char **start , char **end , long n , long q) {

    for ( char **i = start ; i < end ; i++) {

        for ( char **j = i + 1 ; j < end ; j++) {

            if(*(*i + length) > *(*j + length)) {

                char *sort = *i;
                *i = *j;
                *j = sort;
            }
        }
    }

    char c = *(*start + length);
    char **tempstart = start;

    for( char **i = start ; i < end ; i++ ) {

        if ( c != *(*i + length)) {
            c = *(*i + length);

            if(i - tempstart > 1){

                    for(int k = 0 ; k <=length ; k++){
                        cout << *(*tempstart + k);
                    }
                    cout << endl;

                cq = sorter(cq , length + 1 , tempstart , i , n , q);
            } else {

                for(int j = length ; j + *tempstart < &str[0] + n ; j++){

                    for(int k = 0 ; k <= j ; k++){
                        cout << *(*tempstart + k);
                    }
                    cout << "1" << endl;
                }
            }
            tempstart = i;
        }

    }
    if(end - tempstart > 1){

            for(int k = 0 ; k <=length ; k++){
                cout << *(*tempstart + k);
            }
                    cout << endl;


        cq = sorter(cq , length + 1 , tempstart , end , n , q);
    } else {

        for(int j = length ; j + *tempstart < &str[0] + n ; j++){

            for(int k = 0 ; k <= j ; k++){
                cout << *(*tempstart + k);
            }
                    cout << "1" << endl;
        }
    }
    return cq;
}


int main() {

long n,q;
long length = 0;
long long  * cq;
cq = (long long *)malloc(2*sizeof(long long));


ifstream mstr;
mstr.open("query.txt" , ios::in);

mstr >> n;
mstr >> q;

for(long i = 0 ; i < n ; i++) {
    mstr >> str[i];
}

long i=0;

while(mstr >> querys[i++]){}

mstr.close();

sort(querys , querys + q);

pos2[0] = &str[0];

for (long i = 1 ; i < n ; i++) {

    pos2[i] = pos2[0] + i;

}

char **place1 = &pos1[0];

char **place2, **end;
char c;
place2 = &pos2[0] + n;


while (cq[1] < q) {//implement sorter properly

    adress[length] = place1;
    c = 97;
    end = place2;
    place2 = &pos2[0];

    if(end - place2 < 4){

        cq = sorter(cq , length , place2 , end , n , q);

    } else {
    
        for(char **i = &pos2[0] ; i < end ; i++) {
    
            if( *i + length >= &str[0] + n ){
    
                break;
    
            }
            if ( *(*i + length) == c ) {
    
                *(place2++) = *i;
    
            }else {
    
                *(place1++) = *i;
            }
    
        }
    }

    while(place2 == &pos2[0]) {

        if ( c == 122 ){

            if (--length < 0){

                cout << "done" << endl;
                goto allfound;

            }

            c = *(pos2[0] + length);

        }

        c++;
        end = place1;
        place1 = adress[length];

        for (char **i = adress[length] ; i < end ; i++) {

            if ( *(*i + length) == c ) {

                *(place2++) = *i;

            } else {

                *(place1++) = *i;
            }
        }

    }

    for(int k = 0 ; k <= length ; k++){
        cout << *(pos2[0] + k);
    }
    cout << "2" << endl;
    length++;

}

allfound:

while ( cq[1]++ < q ) {

   cout << -1 << endl;
   
}




return 0;

}
