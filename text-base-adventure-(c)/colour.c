#include <stdio.h>

#include "colour.h"

// set colour of text using these functions
void red()
{
  printf("\033[1;31m");
}
void purple()
{
  printf("\033[1;35m");
}
void green()
{
  printf("\033[1;32m");
}
void cyan()
{
  printf("\033[1;36m");
}
void blue()
{
  printf("\033[1;34m");
}
void yellow()
{
  printf("\033[1;33m");
}
void reset()
{
  printf("\033[0m");
}