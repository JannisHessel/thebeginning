#include <iostream>
#include <string>
#include <algorithm>
#include <fstream>

using namespace std;

char str[100000];
long long querys[100000];
char * pos1[100000];//storage for the stings that nat not the current substrings
char * pos2[100000];//storage for all the current substings
char ** adress[100000];//points in pos1 where the stings differ

/*

int count(long length) {
    int c = 0;
    for ( char i = 97 ; i < 123 ; i++) {

        for (long j = 0 ; j < length ; j++){

            if(i == substr[j]){

                c++;
                break;
            }
        }
    }
    return c;
}


*/



int main() {

long n,q;
long length = 0;
long long number = 0;
long cq = 0;



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

adress[0] = &pos1[0];

char **place1, **place2, **end;
char c;
place2 = &pos2[0] + n;

while (cq < q) {

    place1 = adress[length];
    c = 97;
    end = place2;
    place2 = &pos2[0];


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
    if (++number == querys[cq]) {
        cout << "got one" << endl;
        cq++;
    }

    
    length++;

    

}
allfound:

while ( cq++ < q ) {
   cout << -1 << endl;
}

return 0;

}
