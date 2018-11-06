#include <iostream>
#include <string>
#include <algorithm>
#include <fstream>

using namespace std;

char str[100001];
long long querys[100000];
char * pos[100000];


bool compare (char* a , char* j) {
    if (*a > *b){
        return true;
    } else if (*a == *b) {
        return compare(a+1 , b+1)
    } else {
        return false;
    }
}


long long * sorter(long long cq[2] , long length , char **start , long n , long q) {


    if(*(*start + length) == 0) {
        start ++ ;
    }
    char c = *(*start + length);

    char **tmp = start;

    while(*(*(++tmp) + length) == c);

    
    
    cq = sorter(cq)



    for( char **i = start ; i < end ; i++ ) {

        if ( c != *(*i + length)) {

            c = *(*i + length);

            if(i - tempstart > 1){

                if(cq[0] == querys[cq[1]]){
                    cout << "got onea" << cq[0] << endl;
                    if(++cq[1] == q){return cq;}
                }

/*                for(int k = 0 ; k <= length ; k++){
                        cout << *(*tempstart + k);
                }
                cout << endl;*/



                cq = sorter(cq , length + 1 , tempstart , i , n , q);

            } else {

                while((&str[0] + n) - (*tempstart + length) >= querys[cq[1]] - cq[0]){

                    cout << "got oneb"<< querys[cq[1]] << cq[1] <<endl;
                    if(++cq[1] == q){return cq;}
                }
                cq[0] += &str[0] + n - *tempstart - length;


/*                for(int j = length ; j + *tempstart < &str[0] + n ; j++){

                    for(int k = 0 ; k <= j ; k++){
                        cout << *(*tempstart + k);
                    }
                    cout << endl;
                }*/
            }
            tempstart = i;
        }

    }
    if(end - tempstart > 1){

        if(cq[0] == querys[cq[1]]){
            cout << "got onec" << cq[0] << endl;
            if(++cq[1] == q){return cq;}
        }

/*        for(int k = 0 ; k <= length ; k++){
            cout << *(*tempstart + k);
        }
        cout << endl;*/


        cq = sorter(cq , length + 1 , tempstart , end , n , q);

    } else {

        while((&str[0] + n) - (*tempstart + length) >= querys[cq[1]] - cq[0]){

            cout << "got oned"<< querys[cq[1]] << endl;
            if(++cq[1] == q){return cq;}
        }
        cq[0] += &str[0] + n - *tempstart - length;


/*        for(int j = length ; j + *tempstart < &str[0] + n ; j++){

            for(int k = 0 ; k <= j ; k++){
                cout << *(*tempstart + k);
            }
            cout << endl;
        }*/
        
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

pos[0] = &str[0];

for (long i = 1 ; i < n ; i++) {

    pos[i] = pos[0] + i;

}

for ( char **i = &pos[0] ; i < &pos[0] + n ; i++) {

    for ( char **j = i + 1 ; j < &pos[0] + n ; j++) {

        if(compare(*i , *j)) {

            char *sort = *i;
            *i = *j;
            *j = sort;
        }
    }
}